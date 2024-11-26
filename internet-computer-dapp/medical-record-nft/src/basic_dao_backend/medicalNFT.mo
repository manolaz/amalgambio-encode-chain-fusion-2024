// types.mo - Define data structures
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Hash "mo:base/Hash";

module {
    // Medical Record NFT Structure
    public type MedicalRecord = {
        id: Text;
        patientId: Principal;
        documentType: Text;
        encryptedContent: Text;
        accessControlList: [Principal];
        timestamp: Int;
    };

    // Access Request Structure
    public type AccessRequest = {
        requesterPrincipal: Principal;
        recordId: Text;
        status: AccessRequestStatus;
        timestamp: Int;
    };

    // Enum for Access Request Status
    public type AccessRequestStatus = {
        #Pending;
        #Approved;
        #Rejected;
    };
}

// medical_records_nft.mo - Main NFT Management Canister
import Types "./types";

actor MedicalRecordNFT {
    // Stable storage for medical records
    stable var records : [(Text, Types.MedicalRecord)] = [];
    stable var accessRequests : [(Text, Types.AccessRequest)] = [];

    // In-memory hashmaps for efficient lookup
    let recordsMap = HashMap.fromIter<Text, Types.MedicalRecord>(
        records.vals(), 
        Text.hash, 
        Text.equal
    );

    let accessRequestsMap = HashMap.fromIter<Text, Types.AccessRequest>(
        accessRequests.vals(),
        Text.hash, 
        Text.equal
    );

    // Create a new medical record NFT
    public shared(msg) func createMedicalRecord(
        documentType: Text, 
        encryptedContent: Text
    ) : async Text {
        let recordId = generateUniqueId();
        let newRecord : Types.MedicalRecord = {
            id = recordId;
            patientId = msg.caller;
            documentType = documentType;
            encryptedContent = encryptedContent;
            accessControlList = [msg.caller];
            timestamp = Time.now();
        };

        recordsMap.put(recordId, newRecord);
        recordId
    };

    // Request access to a medical record
    public shared(msg) func requestRecordAccess(
        recordId: Text
    ) : async Result.Result<Text, Text> {
        switch (recordsMap.get(recordId)) {
            case (null) { 
                #err("Record not found") 
            };
            case (?record) {
                let requestId = generateUniqueId();
                let accessRequest : Types.AccessRequest = {
                    requesterPrincipal = msg.caller;
                    recordId = recordId;
                    status = #Pending;
                    timestamp = Time.now();
                };

                accessRequestsMap.put(requestId, accessRequest);
                #ok("Access request submitted successfully")
            };
        }
    };

    // Approve or reject access request
    public shared(msg) func processAccessRequest(
        requestId: Text, 
        approve: Bool
    ) : async Result.Result<Text, Text> {
        switch (accessRequestsMap.get(requestId)) {
            case (null) { 
                #err("Access request not found") 
            };
            case (?request) {
                // Ensure only record owner can process request
                let record = switch (recordsMap.get(request.recordId)) {
                    case (null) { return #err("Associated record not found") };
                    case (?r) { r };
                };

                if (record.patientId != msg.caller) {
                    return #err("Unauthorized to process this request");
                }

                let updatedRequest = {
                    request with 
                    status = if (approve) #Approved else #Rejected
                };

                accessRequestsMap.put(requestId, updatedRequest);

                if (approve) {
                    let updatedRecord = {
                        record with 
                        accessControlList = 
                            Buffer.fromArray<Principal>(record.accessControlList)
                            .append(Buffer.fromArray<Principal>([request.requesterPrincipal]))
                            .toArray()
                    };
                    recordsMap.put(record.id, updatedRecord);
                };

                #ok("Access request processed")
            };
        }
    };

    // Retrieve medical record (with access control)
    public shared(msg) func getMedicalRecord(
        recordId: Text
    ) : async Result.Result<Types.MedicalRecord, Text> {
        switch (recordsMap.get(recordId)) {
            case (null) { 
                #err("Record not found") 
            };
            case (?record) {
                // Check if caller has access
                let hasAccess = record.accessControlList
                    .find(func(p : Principal) : Bool { p == msg.caller });
                
                switch (hasAccess) {
                    case (null) { 
                        #err("You do not have access to this record") 
                    };
                    case (?_) { #ok(record) }
                }
            };
        }
    };

    // Utility function to generate unique IDs
    func generateUniqueId() : Text {
        let timestamp = Int.toText(Time.now());
        let randomSuffix = Text.fromChar(Char.fromNat32(Random.next()));
        timestamp # "-" # randomSuffix
    };

    // Preupgrade and postupgrade hooks for stable storage
    system func preupgrade() {
        records := Iter.toArray(recordsMap.entries());
        accessRequests := Iter.toArray(accessRequestsMap.entries());
    };

    system func postupgrade() {
        recordsMap := HashMap.fromIter<Text, Types.MedicalRecord>(
            records.vals(), 
            Text.hash, 
            Text.equal
        );
        accessRequestsMap := HashMap.fromIter<Text, Types.AccessRequest>(
            accessRequests.vals(),
            Text.hash, 
            Text.equal
        );
    };
}