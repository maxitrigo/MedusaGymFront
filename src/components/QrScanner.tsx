import { Html5Qrcode } from "html5-qrcode";
import { authInfo, logTraining } from "../helpers/DataRequests";
import { useDispatch } from "react-redux";
import { setGymUser } from "../Redux/gymUserSlice";
import ConfirmationCircle from "./ConfirmationCircle";

// import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

const QRScanner = () => {
  const [scanResult, setScanResult] = useState()
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // const scanner = new Html5QrcodeScanner('reader', {
    //   qrbox: {
    //     width: 250,
    //     height: 250,
    //   },
    //   fps: 40,
    // }, false )
    
    // const error = () => {

    // }
    // const success = (result: any) => {
    //   scanner.pause(true)
    //   scanner.clear()
    //   setScanResult(result)
    //   handleScann(scanResult)
    // }

    // scanner.render(success,error)
    
    const successCallback = (result: any) => {
      console.log('verificado')
      scanner.clear()
      setScanResult(result)
      handleScann(scanResult)
    }

    const scanner = new Html5Qrcode('reader')
    // const cameras = Html5Qrcode.getCameras()
    scanner.start(
      {facingMode: 'user'}, 
      {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 40,
      },
      successCallback,
      () => {}
    )


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
