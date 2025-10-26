
const localPaths = {
    singIn: "/auth/login",
    singInWithGoogle: "/auth/google",
    singUp: "/user/sing-up",
    noticias: "/noticia"
}
const prodPaths = {
    singIn: "",
    singInWithGoogle: "",
    singUp: "",
    noticias: ""
}

export const apiRoutes = import.meta.env.DEV?localPaths:prodPaths;
