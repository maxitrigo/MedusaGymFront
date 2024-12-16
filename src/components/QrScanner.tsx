import { Html5Qrcode } from "html5-qrcode";
import { authInfo, logTraining } from "../helpers/DataRequests";
import { useDispatch } from "react-redux";
import { setGymUser } from "../Redux/gymUserSlice";
import ConfirmationCircle from "./ConfirmationCircle";

import { useEffect, useRef, useState } from "react"

const QRScanner = () => {
  const [isScanned, setIsScanned] = useState<boolean>(false)
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const dispatch = useDispatch();
  const scannerRef = useRef<Html5Qrcode|null> (null)

  useEffect(() => {
      startScanner()
  },[])

  const startScanner = () =>{
    if (scannerRef.current) {
      console.log('escaner ya iniciado');
      
      return
    }
    const scanner = new Html5Qrcode('reader')
    scannerRef.current = scanner
    scanner.start(
      {facingMode: 'environment'}, 
      {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 40,
      },
      (result) => {
        scanner.pause(true)
        handleScann(result)
        setIsScanned(true)
        scanner.stop()
      },
      () => {}
    )
  }





  const handleScann = async (data: any) => {
    try {
            let result;

            if (data === "log-training") {
              const { token } = authInfo();
              result = await logTraining(token);
            } else if (data) {
              const token = data;
              result = await logTraining(token)
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
      { isScanned ?
      <ConfirmationCircle confirmed={confirmed} /> :
      <div id='reader'></div>
    }
    </div>
  )
}

export default QRScanner
