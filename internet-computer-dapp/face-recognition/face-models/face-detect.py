import torch
import facenet_pytorch
resnet = facenet_pytorch.InceptionResnetV1(pretrained='vggface2').eval()
input = torch.randn(1, 3, 160, 160)
torch.onnx.export(resnet, input, "version-RFB-320.onnx", verbose=False, opset_version=11)