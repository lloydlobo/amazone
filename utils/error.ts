import { ToastContent, ToastContentProps } from "react-toastify"
import { ReactNode } from "react"

type ToastMessage<T = unknown> = ReactNode | ((props: ToastContentProps<T>) => ReactNode) | null | undefined
type ToastDataMessage = {
    message: ToastMessage
}
type ToastErrorType = {
    response: {
        data: ToastDataMessage
    };
    message: ToastMessage;
}

/**
* getError function returns error of type ToastContent.
*
* Implimented in login page's onSubmit handler func,
* in a try/catch block while handling next-auth signIn func.
*/
function getError(err: { err?: unknown; response?: any; message?: any }): ToastContent<unknown> {
    console.log(err)
    if (
        err.response &&
        err.response.data &&
        err.response.data.message
    ) {
        return err.response.data.message
    }
    return err.message
}

export { getError }

// import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, ReactNode } from "react"
// type ToastContent<T = unknown> = React.ReactNode | ((props: ToastContentProps<T>) => React.ReactNode);
// | string | number | boolean
// | ReactElement<any, string | JSXElementConstructor<any>>
// | ReactFragment | ReactPortal
// | null | undefined

