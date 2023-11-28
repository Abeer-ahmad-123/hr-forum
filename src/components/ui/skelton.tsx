interface SkeltonProps{
    className?: string
}

export default function skelton({className}:SkeltonProps){
    return <div className={`bg-skelton animate-pulse ${className}`}/>
}