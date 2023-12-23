import { Link } from 'react-router-dom';

export const link = [
    { name: 'Snap', current: false, to: '/' },
    { name: 'Qr Code', current: false, to: '/qrcode-generator' },
    { name: 'Converter', current: false, to: '/yt-converter' }
]

export const NavLinks = () => {

    return(

        <ul className="flex gap-2 text-slate-800 text-lg cursor-pointer">
            
            {
                link.map((link) => (

                    <li key={link.name}>

                        <Link to={link.to} className={ link.current ? 'current' : 'opacity-1 font-semibold p-2 hover:text-violet-700' }>
                            { link.name }
                        </Link>

                    </li>
                   

                ))
            }

        </ul>
    )
}