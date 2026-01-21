
const localPaths = {
    singIn: "/auth/login",
    singInWithGoogle: "/auth/google",
    singUp: "/user/sing-up",
    noticias: "/noticia",
    proyectos: "/proyecto",
    informe: "/informe",
    ficha_tecnica: "/fichaTecnica",
    junta_directiva: "/miembroDeJunta"
}
const prodPaths = {
    singIn: "",
    singInWithGoogle: "",
    singUp: "",
    noticias: "",
    proyectos: "",
    informe: "",
    ficha_tecnica: "",
    junta_directiva: ""
}

export const apiRoutes = import.meta.env.DEV?localPaths:prodPaths;
