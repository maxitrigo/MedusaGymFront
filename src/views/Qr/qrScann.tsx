import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import QRGenerator from "../../components/QrGenerator";
import QRScanner from "../../components/QrScanner";
import { useSelector } from "react-redux";

export const QrScann = () => {
  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const role = useSelector((state: any) => state.user.role);

  useEffect(()=>{
    setScannerActive(true)
    return () => {
        setScannerActive(false)
    }
  },[])

  return (
    <div className="w-full h-screen overflow-hidden overscroll-none">
      <NavBar />
      <div className="w-full h-full vertical-center">
        {role === 'admin' ?
            (<div className="w-screen h-screen">
            <QRScanner isActive={scannerActive} />
            </div>)
            :
            (<div className="bg-white rounded-3xl m-4">
            <QRGenerator />
            </div>)
        }
      </div>
    </div>
  );
};


