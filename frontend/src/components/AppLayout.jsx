import Sidebar from "./Sidebar";

function AppLayout({ children, setUser }) {

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar
  setUser={setUser}
  user={children.props.user}
/>

      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}

export default AppLayout;