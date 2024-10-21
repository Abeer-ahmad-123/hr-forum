import Skelton from '../ui/skelton'
import RenderFeedLoading from './renderFeedLoading'
interface Props {
  token?: string
  pathName?: string
}
const CardLoading = ({ token, pathName }: Props) => {
  const renderTimes = 5
  const slug = pathName?.split('/')[2]

  return (
    <div className={`flex flex-col justify-center  max-md:block max-md:w-full`}>
      {!pathName?.includes('user-activity') ||
        (!pathName?.includes('/channels') && (
          <div className="w-full rounded-xl">
            <Skelton className="h-24 w-full  rounded-xl bg-skelton" />
          </div>
        ))}

      {token && (
        <div className=" w-full rounded-xl">
          <Skelton
            className={
              pathName?.includes('/saved') || pathName?.includes('/popular')
                ? 'mb-5 h-40 w-full  rounded-xl bg-skelton '
                : 'hidden'
            }
          />
        </div>
      )}
      {token && (
        <div className="w-full rounded-xl">
          <Skelton
            className={
              token && 'mt-5' && pathName?.includes('/feed')
                ? 'mb-5 h-24 w-full  rounded-xl bg-skelton '
                : 'hidden'
            }
          />
        </div>
      )}

      <div className="flex w-full max-w-full flex-col lg:max-w-screen-md">
        {pathName?.includes(`/${slug}/`) && (
          <div className="mb-4 mt-[25px] rounded-xl bg-white py-2 dark:bg-bg-primary-dark">
            <Skelton className="ml-4 h-8 w-24 rounded-sm bg-skelton" />
            <div className="mt-2 flex items-center ">
              <div className="ml-4">
                <div className="flex flex-row gap-x-2">
                  <Skelton className="h-8 w-24 rounded-sm bg-skelton" />
                  <Skelton className="h-8 w-24  rounded-sm bg-skelton" />
                  <Skelton className="h-8 w-24 rounded-sm bg-skelton" />
                </div>
              </div>
            </div>
          </div>
        )}
        {pathName?.includes('/channels') && <BannerCardLoading />}
        {pathName?.includes('/saved') && token && <BannerCardLoading />}
        {pathName?.includes('/popular') && (
          <>
            <Skelton
              className={`mb-5 mt-4 h-[119px] w-full rounded-md bg-skelton`}
            />
          </>
        )}
        {Array.from({ length: renderTimes }, (_, index) => (
          <RenderFeedLoading key={index} />
        ))}
      </div>
    </div>
  )
}

export default CardLoading

const BannerCardLoading = () => {
  // const [token, setToken] = useState<string | null>(null)

  // useEffect(() => {
  //   const storedTokens = getTokens()
  //   if (storedTokens) {
  //     setToken(storedTokens?.accessToken)
  //   }
  // }, [])

  return (
    <div className="mb-5 h-[266px] rounded-xl bg-bg-primary px-2 dark:bg-bg-primary-dark">
      <Skelton className="mt-[15px] h-[190px] w-full rounded-md" />

      <div className="flex items-center justify-center px-5 pt-3">
        <Skelton className="mr-3 flex h-11 w-11 items-center justify-center rounded-full bg-bg-tertiary text-black dark:bg-dark-grey" />

        <div className="flex flex-1 justify-between">
          <Skelton className="h-11 w-28 rounded-md" />
          <Skelton className="h-11 w-24 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
