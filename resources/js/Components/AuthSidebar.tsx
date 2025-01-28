export default function AuthSidebar() {
    return (
        <div className="w-1/2 bg-[#355E3B]  p-8 flex flex-col justify-center items-center text-white"
            style={
                {
                    backgroundImage: `url(${'assets/images/backgrounds/login-bg.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }
            }
        >
                <div className="max-w-md text-center">
                    <h2 className="text-2xl font-bold mb-4">Connect with every application.</h2>
                    <p className="mb-8">Everything you need in an easily customizable dashboard.</p>
                    <div className="flex justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white opacity-100"></div>
                        <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                        <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                    </div>
                </div>
            </div>
    );
}   

