const CardContent = ({ content }: any) => {
  return (
    <span
      suppressHydrationWarning={true}
      className="card-li max-w-full !hyphens-auto !break-words text-start text-base text-gray-700 dark:text-gray-300 max-custom-sm:text-[13px]"
      dangerouslySetInnerHTML={{
        __html: `${content
          .slice(0, 200)
          .concat(
            content?.length > 200
              ? '<span className="text-gray-500">....</span>'
              : '',
          )}`,
      }}
    />
  )
}

export default CardContent
