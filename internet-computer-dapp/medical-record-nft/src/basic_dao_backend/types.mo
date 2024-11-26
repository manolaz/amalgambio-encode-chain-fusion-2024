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
