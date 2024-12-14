import { ReactElement, useRef, useEffect } from 'react'
import jsQR from 'jsqr'
import { useDispatch } from 'react-redux'
import { setGymUser } from '../Redux/gymUserSlice'
import { authInfo, logTraining } from '../helpers/DataRequests'


export const QRScanner = ({
  active,
  onSuccessfulScan
}: {
  active: boolean
  onSuccessfulScan: (data: string) => void
}): ReactElement => {
  const video = useRef<HTMLVideoElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const dispatch = useDispatch()

  const startCapturing = (): void => {
    if (!canvas.current || !video.current) return

    const context = canvas.current.getContext('2d')
    if (!context) return

    const { width, height } = canvas.current
    context.drawImage(video.current, 0, 0, width, height)

    const imageData = context.getImageData(0, 0, width, height)
    const qrCode = jsQR(imageData.data, width, height)

    if (!qrCode) {
      setTimeout(startCapturing, 500)
    } else {
      handleScan(qrCode.data)
    }
  }

  const handleScan = async (data: string): Promise<void> => {
    try {
      let result

      if (data === 'log-training') {
        const { token } = authInfo()
        result = await logTraining(token)
      } else {
        result = await logTraining(data)
      }

      if (result && !result.error) {
        dispatch(setGymUser(result))
        onSuccessfulScan(result)
      } else {
        console.error('Error al procesar el QR')
      }
    } catch (error) {
      console.error('Error durante el escaneo: ', error)
    } finally {
      stopMediaStream()
    }
  }

  const stopMediaStream = (): void => {
    if (video.current && video.current.srcObject) {
      const stream = video.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      video.current.srcObject = null
    }
  }

  const handleCanPlay = (): void => {
    if (!canvas.current || !video.current) return

    canvas.current.width = video.current.videoWidth
    canvas.current.height = video.current.videoHeight
    startCapturing()
  }

  useEffect(() => {
    if (!active) return;
  
    const startMediaStream = async (): Promise<void> => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
  
        if (video.current) {
          video.current.srcObject = stream;
          video.current
            .play()
            .catch((err) => console.error('Error al reproducir el video: ', err));
        }
      } catch (error) {
        console.error('No se pudo acceder a la cámara: ', error);
      }
    };
  
    startMediaStream();
  
    return () => {
      if (video.current && video.current.srcObject) {
        const stream = video.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        video.current.srcObject = null;
      }
    };
  }, [active]);
  

  return (
    <div className={`scanner ${active ? '' : 'scanner--hidden'}`}>
      <div className="scanner__aspect-ratio-container">
        <canvas ref={canvas} className="scanner__canvas" />
        <video
          muted
          playsInline
          ref={video}
          onCanPlay={handleCanPlay}
          className="scanner__video"
        />
      </div>
      <div className="scanner-tip">
        <div>Scan a QR code with your camera to see what it says.</div>
      </div>
    </div>
  )
}
