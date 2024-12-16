import { Html5Qrcode } from "html5-qrcode";
import { authInfo, logTraining } from "../helpers/DataRequests";
import { useDispatch } from "react-redux";
import { setGymUser } from "../Redux/gymUserSlice";
import ConfirmationCircle from "./ConfirmationCircle";

// import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

const QRScanner = () => {
  const [isScanned, setIsScanned] = useState<boolean>(false)
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
    //   setScannResult(result)
    //   handleScann(scannResult)
    // }

    // scanner.render(success,error)

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
      (result)=>{
        scanner.pause(true)
        handleScann(result)
        setIsScanned(true)
      },
      () => {}
    )


  },[])

  const handleScann = async (data: any) => {
    try {
            let result;
            console.log();
            
            if (data === "log-training") {
              const { token } = authInfo();
              result = await logTraining(token);
            } else if (data) {
              const token = data;
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
      { isScanned ?
      <ConfirmationCircle confirmed={confirmed} /> :
      <div id='reader'></div>
    }
    </div>
  )
}

export default QRScanner
