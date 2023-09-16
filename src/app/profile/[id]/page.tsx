export default function UserProfilePage(params:any){
    const id = params.id;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                Profile
            </h1>
            <hr/>
            <p className="text-4xl">Profile page </p>
        </div>
    )   
}