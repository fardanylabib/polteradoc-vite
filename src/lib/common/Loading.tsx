interface ILoadingProps{
    white?:boolean;
}

export const Loading = ({white}:ILoadingProps) => (
    <div className={`lds-ellipsis ${white? "white" : ""}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export const LoadingOverlay = () => (
    <div className="fixed top-0 h-screen w-full z-40">
        <div className="absolute bg-black bg-opacity-60 w-full h-screen flex flex-col justify-center">
            <div className="text-center">
                <Loading/>
            </div>
        </div>
    </div>
)

export const CircleLoading = () => (
    <div className="loading-circle"/>
)