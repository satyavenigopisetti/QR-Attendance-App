import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:geolocator/geolocator.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'dart:io';

class ScanPage extends StatefulWidget {
  @override
  _ScanPageState createState() => _ScanPageState();
}

class _ScanPageState extends State<ScanPage> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? controller;

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) async {
      controller.pauseCamera();

      Position pos = await Geolocator.getCurrentPosition();
      XFile? photo = await ImagePicker().pickImage(source: ImageSource.camera);

      var request = http.MultipartRequest(
        'POST',
        Uri.parse('http://10.0.2.2:8000/attendance/'),
      );
      request.fields['session_qr'] = scanData.code!;
      request.fields['lat'] = pos.latitude.toString();
      request.fields['lon'] = pos.longitude.toString();
      request.files.add(await http.MultipartFile.fromPath('file', photo!.path));

      var response = await request.send();
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Attendance marked!')));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error marking attendance')));
      }

      controller.resumeCamera();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Scan QR')),
      body: QRView(key: qrKey, onQRViewCreated: _onQRViewCreated),
    );
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }
}
