import MoshonkuLogo from '../../public/images/moshonku_logo.svg'
export default function Header() {
  return (
    <div className="h-[15vh] py-5 pt-5">
      <img src={MoshonkuLogo} alt={MoshonkuLogo} className="w-32" />
    </div>
  )
}
