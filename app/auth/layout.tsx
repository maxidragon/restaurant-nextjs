const AuthLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full"
             style={{
                backgroundImage: `url('https://source.unsplash.com/random/?food')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
             }}>
            <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;