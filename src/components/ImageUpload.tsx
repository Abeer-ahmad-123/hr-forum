'use client'
import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from './ui/Dialog/simpleDialog'

import CircularProgressIcon from '@/assets/icons/circularProgress'
import { Slider } from './ui/slider'

interface ImageUploadProps {
  image: any
  dialogOpen: boolean
  saveCroppedImage: (img: any) => void
  setOpenDialog: (dialogOpen: any) => void
  disableButton: boolean
}

function ImageUpload({
  image,
  dialogOpen,
  disableButton,
  setOpenDialog,
  saveCroppedImage,
}: ImageUploadProps) {
  const imgCanvas: any = useRef({})
  const [scale, setScale] = useState<any>(1)

  const handleScaleChange = (e: any) => {
    const scale = parseFloat(e)

    setScale(scale)
  }
  const save = () => {
    imgCanvas?.current?.getImageScaledToCanvas()?.toBlob((blob: any) => {
      saveCroppedImage(blob)
    })
  }
  const closeDialog = () => {
    saveCroppedImage(null)
    setOpenDialog(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={closeDialog}>
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
              <div>
                <div className="my-1 flex justify-center gap-3">
                  <div
                    className="cp"
                    onClick={() => scale > 1 && setScale(scale - 0.1)}>
                    <p>-</p>
                  </div>
                  <Slider
                    defaultValue={[1]}
                    max={2}
                    min={1}
                    value={[scale]}
                    onValueChange={handleScaleChange}
                    name="scale"
                    step={0.01}
                    className="w-1/2 cursor-pointer"
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
            onClick={closeDialog}
            className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-accent focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
            Cancel
          </button>

          <button
            onClick={save}
            type="button"
            className={`dark:bg-accent-600 hover:bg-accent-800 mb-2 me-2 flex rounded-lg   ${
              disableButton ? 'bg-gray-400' : 'bg-accent'
            }  px-5 py-2.5 text-sm font-medium text-white focus:outline-none`}>
            Save
            {disableButton ? (
              <div className="ml-2">
                <CircularProgressIcon color="gray" />
              </div>
            ) : (
              <></>
            )}
          </button>
        </div>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  )
}

export default ImageUpload
