import { RenderChildrenProps } from '@/utils/interfaces/renderChildren'

const RenderChildren = ({
  isError,
  isRegisterPage,
  isLoginPage,
  children,
}: RenderChildrenProps) => {
  return (
    <div
      className={`first-letter w-full transition-all duration-700 ease-in-out max-md:py-5 max-sm:p-[10px] 
                    ${
                      isRegisterPage || isLoginPage
                        ? 'flex items-center justify-center'
                        : ''
                    }
                `}>
      <div className={isError ? 'mt-0' : 'mt-[86px]'}> {children}</div>
    </div>
  )
}

export default RenderChildren
