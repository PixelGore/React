import React from 'react'
import PreLoader from "../Components/Common/Preloader/Preloader"

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <React.Suspense fallback={<PreLoader />}>
            <WrappedComponent {...props} />
        </React.Suspense>
    }
}