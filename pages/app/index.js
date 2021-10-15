import React from "react";

function Index(props) {
  const { state, dispatch } = useContext(Store);
  const { isLogin } = state;

  return (
    <div>
      {" "}
      <div>uwuw</div>
    </div>
  );
}

export default Index;
export async function getServerSideProps() {
  const session = supabase.auth.session();
  if (session) {
    const { id } = session.user;
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", id)
      .single();
    const { role } = data;
    if (role === "personal" || role === "business") {
      const { error } = await supabase.auth.signOut();
      dispatch({ type: "USER_LOGOUT" });
    }
  }

  if (!data) {
    return {
      redirect: {
        destination: "/app/dasboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
