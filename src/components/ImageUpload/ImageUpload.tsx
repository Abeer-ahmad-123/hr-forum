'use client'
import { useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from '../ui/Dialog/simpleDialog'

import './style.css'

interface ImageUploadProps {
  image: any
  saveCroppedImage: (img: any) => void
  disableButton?: boolean | null
  upload: boolean
}

function ImageUpload({ image, saveCroppedImage, upload }: ImageUploadProps) {
  const imgCanvas: any = useRef({})
  const [scale, setScale] = useState<any>(1)
  const [dialogOpen, setOpenDialog] = useState<boolean>(false)

  const handleScale = (e: any) => {
    const scale = parseFloat(e.target.value)
    setScale(scale)
  }
  const save = () => {
    imgCanvas?.current?.getImageScaledToCanvas()?.toBlob((blob: any) => {
      saveCroppedImage(blob)
    })
  }
  const setDialog = () => {
    setOpenDialog(!upload)
  }

  useEffect(() => {
    if (upload) {
      setOpenDialog(true)
    }
  }, [])
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialog}>
      <DialogContent className="bg-white">
        <DialogDescription>
          <div>
            <AvatarEditor
              ref={imgCanvas}
              image={image}
              border={10}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={parseFloat(scale)}
              rotate={0}
              width={450}
              height={450}
            />
            <div className="a-c">
              <div
              //   sx={classes.zoomScaleContainer}
              >
                <div className="my-1 flex justify-center gap-3">
                  <div
                    className="cp"
                    onClick={() => scale > 1 && setScale(scale - 0.1)}>
                    <p>-</p>
                  </div>
                  <input
                    name="scale"
                    type="range"
                    onChange={handleScale}
                    min={1}
                    value={scale}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                  />
                  <div
                    className="cp"
                    onClick={() => scale < 2 && setScale(scale + 0.1)}>
                    <p>+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogDescription>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={setDialog}
            className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-accent focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
            Cancel
          </button>

          <button
            onClick={save}
            type="button"
            className="dark:bg-accent-600 hover:bg-accent-800 mb-2 me-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white focus:outline-none">
            Save
          </button>
        </div>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  )
}

export default ImageUpload
