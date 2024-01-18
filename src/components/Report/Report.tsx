'use client'
import InfoIcon from '@/assets/icons/InfoIcon'
import CircularProgressIcon from '@/assets/icons/circularProgress'
import { useInterceptor } from '@/hooks/interceptors'
import { reportComment, reportPost } from '@/services/report'
import { showErrorAlert, showSuccessAlert } from '@/utils/helper'
import { LoggedInUser } from '@/utils/interfaces/loggedInUser'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Data = [
  {
    reason: 'Sexual content',
    description:
      'content that include graphics ,nudity or other type of sexual content',
  },
  {
    reason: 'Hateful and Abusive Content',
    description: 'content that is voilent,graphics or posted to shock viewers',
  },
  {
    reason: 'Harness or bullying',
    description:
      'content that promotes hatred against protected groups abusive vulnerarble individuals',
  },
  {
    reason: 'Harmful and dangerous acts',
    description: 'content that included acts that may physical harm',
  },
  {
    reason: 'Misinformation',
    description:
      'content that is misleading or deceptive with serious risk of egresious harm',
  },
  {
    reason: 'Child Abuse',
    description:
      'content that includes sexual , predatory or abusive communications towards minors',
  },
  {
    reason: 'Promotes terrorism',
    description: 'content that is intended to recruit terrorsit organizations',
  },
  {
    reason: 'Spam or misLeading',
    description:
      'content that is massively posted or have miss leading information',
  },
  {
    reason: 'legal issues',
    description: 'copyrights , privacy or other legal complaints',
  },
  {
    reason: 'Caption issues',
    description: 'missing inaccurate or abusive captions ',
  },
]

interface ReportInterface {
  postId?: string
  reportType: string
  setOpenDialog: (arg0: boolean) => void
  commentId?: string
  setReportedReplyId?: (arg1: string) => void
  setReportedCommentId?: (arg1: string) => void
}

const Report = ({
  postId,
  reportType,
  commentId,
  setOpenDialog,
  setReportedReplyId,
  setReportedCommentId,
}: ReportInterface) => {
  const [selectedItem, setSelectedItem] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const tokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.token) ?? ''
  const refreshTokenInRedux =
    useSelector((state: LoggedInUser) => state?.loggedInUser?.refreshToken) ??
    ''
  const router = useRouter()

  const { customFetch } = useInterceptor()
  const handleClick = (reason: any) => {
    setSelectedItem(reason)
  }
  const handleCancel = () => {
    setOpenDialog(false)
  }

  const handleSubmit = async () => {
    setLoading(true)

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
      console.log('Reported comment or reply Id', commentId)
      showSuccessAlert('Thanks for submitting you feedback')
      setReportedReplyId && setReportedReplyId(commentId!)
      setReportedCommentId && setReportedCommentId(commentId!)
      router.refresh()
    } else {
      tokenInRedux
        ? showErrorAlert('Something went wrong')
        : showErrorAlert('Please login to report')
    }

    setLoading(false)
    setOpenDialog(false)
  }

  console.log('Comment id in props', commentId)

  return (
    <div className="gap-8">
      <div className="flex justify-items-start pb-8 "> Report comment</div>
      {Data.map((text, index) => (
        <div key={index} className={`flex cursor-pointer  gap-4`}>
          <div className="flex items-center gap-4 pb-2">
            <input
              type="radio"
              id={`radioButton-${index}`}
              name="example"
              className="h-4 w-4 cursor-pointer"
              onChange={() => handleClick(text.reason)}
              value={selectedItem}
            />

            <div>{text.reason}</div>
            <div className=" relative hover:block hover:opacity-100">
              <div className="opacity-1 z-10 transition-opacity duration-300 ease-in-out">
                <div className="group relative">
                  <div className="rounded-full">
                    <InfoIcon />
                  </div>
                  <div className="invisible absolute  left-full top-0 z-10 h-20 w-[8rem] overflow-auto rounded-md bg-gray-800 p-2 text-[12px] text-white opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100">
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
