// import { useEffect, useRef, useState } from "react";
// import { Html5Qrcode } from "html5-qrcode";
import { authInfo, logTraining } from "../helpers/DataRequests";
import { useDispatch } from "react-redux";
import { setGymUser } from "../Redux/gymUserSlice";
import ConfirmationCircle from "./ConfirmationCircle";

import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

// const QRScanner: React.FC = () => {
//   const [confirmed, setConfirmed] = useState<boolean>(false);
//   const [scannerUsed, setScannerUsed] = useState<boolean>(false);
//   const qrCodeRef = useRef<HTMLDivElement>(null);
//   const dispatch = useDispatch();

//   const handleScan = async (decodedText: string) => {
//     try {
//       let result;

//       if (decodedText === "log-training") {
//         const { token } = authInfo();
//         result = await logTraining(token);
//       } else if (decodedText) {
//         const token = decodedText;
//         result = await logTraining(token);
//       }

//       if (result && !result.error) {
//         dispatch(setGymUser(result));
//         setConfirmed(true);
//       } else {
//         setConfirmed(false);
//       }
//     } catch (error) {
//       setConfirmed(false);
//     } finally {
//       setScannerUsed(true);
//     }
//   };

//   useEffect(() => {
//     const startQRScanner = async () => {
//       if (qrCodeRef.current && !scannerUsed) {
//         const html5QrCode = new Html5Qrcode("qr-reader");
//         try {
//           await html5QrCode.start(
//             { facingMode: "environment" },
//             { fps: 40, qrbox: { width: 250, height: 250 } },
//             handleScan,
//             () => {}
//           );
//         } catch (err) {
//         }
//       }
//     };
//     startQRScanner()
//     return () => {
//     };
//   }, [scannerUsed]);

//   return (
//     <div className="bg-background w-full h-full text-white">
//       {!scannerUsed ? (
//         <div
//           id="qr-reader"
//           ref={qrCodeRef}
//         ></div>
//       ) : (
//         <ConfirmationCircle confirmed={confirmed} />
//       )}
//     </div>
//   );
// };

// export default QRScanner;



const QRScanner = () => {
  const [scanResult, setScanResult] = useState()
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 40,
    }, true )
    
    const error = (err: any) => {
      console.warn(err)
    }
    const success = (result: any) => {
      scanner.clear()
      setScanResult(result)
      handleScann(scanResult)
    }

    scanner.render(success,error)

  },[])

  const handleScann = async (scanResult: any) => {
    try {
            let result;
      
            if (scanResult === "log-training") {
              const { token } = authInfo();
              result = await logTraining(token);
            } else if (scanResult) {
              const token = scanResult;
              result = await logTraining(token);
            }
      
            if (result && !result.error) {
              dispatch(setGymUser(result));
              setConfirmed(true);
            } else {
              setConfirmed(false);
            }
          } catch (error) {
            setConfirmed(false);
          }
  }

  return (
    <div>
      { scanResult ?
      <ConfirmationCircle confirmed={confirmed} /> :
      <div id='reader'></div>
    }
    </div>
  )
}

export default QRScanner
