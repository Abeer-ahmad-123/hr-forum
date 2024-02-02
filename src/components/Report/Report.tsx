'use client'
import InfoIcon from '@/assets/icons/InfoIcon'
import CircularProgressIcon from '@/assets/icons/circularProgress'
import { useFetchFailedClient } from '@/hooks/handleFetchFailed'
import { useInterceptor } from '@/hooks/interceptors'
import { reportComment, reportPost } from '@/services/report'
import { reportData } from '@/utils/data'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface ReportInterface {
  postId?: string
  reportType: string
  setOpenDialog: (arg0: boolean) => void
  commentId?: string
  setReportedReplyId: (arg1: string) => void
  setReportedCommentId: (arg1: string) => void
  getPostCommets: () => void
  setReported: (arg1: boolean) => void
}

const Report = ({
  postId,
  reportType,
  commentId,
  setOpenDialog,
  setReportedReplyId,
  setReportedCommentId,
  getPostCommets,
  setReported,
}: ReportInterface) => {
  const [selectedItem, setSelectedItem] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const router = useRouter()
  const { handleRedirect } = useFetchFailedClient()

  const { customFetch } = useInterceptor()

  const handleCancel = () => {
    setOpenDialog(false)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response =
        reportType == 'post'
          ? await reportPost(
              postId!,
              selectedItem,
              customFetch,
              tokenInRedux,
              refreshTokenInRedux,
            ) // else report type can be comment and reply so calling the same endpoint with Id of either comment or reply
          : await reportComment(
              commentId!,
              selectedItem,
              customFetch,
              tokenInRedux,
              refreshTokenInRedux,
            )

      if (response.success) {
        showSuccessAlert('Thanks for submitting you feedback')
        getPostCommets()
        setReported(true)
        setReportedReplyId(commentId!)
        setReportedCommentId(commentId!)
        router.refresh()
      } else if (!response.success) {
        throw response.errors[0]
      }
    } catch (error) {
      if (error instanceof Error) {
        handleRedirect({ error })
      }
      showErrorAlert(`${error}`)
    } finally {
      setLoading(false)
      setOpenDialog(false)
    }
  }

  const handleTextClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedItem((e.target as HTMLDivElement).id)
  }

  return (
    <div className="gap-8">
      <div className="flex justify-items-start pb-8 "> Report comment</div>
      {reportData.map((text, index) => (
        <div key={index} className={`flex cursor-pointer  gap-4`}>
          <div className="flex items-center gap-4 pb-4">
            <div
              className="flex items-center gap-3"
              onClick={handleTextClick}
              id={text.reason}>
              <input
                type="radio"
                id={text.reason}
                name="example"
                className="h-4 w-4 cursor-pointer border border-[#d3d3d3] accent-[#571ce0]"
                value={selectedItem}
                checked={selectedItem === text.reason}
              />

              <div id={text.reason}>{text.reason}</div>
            </div>
            <div className=" relative hover:block hover:opacity-100">
              <div className="opacity-1 z-10 transition-opacity duration-300 ease-in-out">
                <div className="group relative">
                  <div className="rounded-full">
                    <InfoIcon />
                  </div>
                  <div className="invisible absolute  left-full top-0 z-10 w-[8rem] overflow-auto rounded-md bg-gray-800 p-2 text-[12px] text-white opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100">
                    {text.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="duration-450 flex h-10 w-32 cursor-pointer items-center justify-center rounded-md border border-solid border-accent text-accent transition hover:bg-accent hover:text-white ">
          {' '}
          cancel
        </button>
        <button
          onClick={handleSubmit}
          className={`flex h-10 w-32 cursor-pointer items-center justify-center rounded-md text-white 
          ${loading ? 'bg-gray-300' : 'bg-accent'}
          ${!selectedItem ? 'bg-gray-300' : 'bg-accent'}`}>
          submit{' '}
          {loading ? (
            <div className="ml-2">
              <CircularProgressIcon color="gray" />
            </div>
          ) : (
            <></>
          )}
        </button>
      </div>
    </div>
  )
}

export default Report
