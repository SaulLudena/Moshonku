import MoshonkuLogo from "../../public/images/moshonku_logo.svg";
export default function Header() {
  return (
    <div className="h-[20vh] py-5 pt-5  grid items-center">
      <img
        src={MoshonkuLogo}
        alt={MoshonkuLogo}
        className="w-24 max-2xl:w-24"
      />
    </div>
  );
}
