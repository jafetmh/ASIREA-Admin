
const localPaths = {
    singIn: "/auth/login",
    singInWithGoogle: "/auth/google",
    singUp: "/user/sing-up",
    noticias: "/noticia",
    proyectos: "/proyecto",
    informe: "/informe",
    ficha_tecnica: "/fichaTecnica",
    junta_directiva: "/miembroDeJunta",
    junta_directiva_inactivos: "/miembroDeJunta/inactivos",
    administrativo: "/administrativo",
    administrativo_inactivos: "/administrativo/inactivos"
}
const prodPaths = {
    singIn: "",
    singInWithGoogle: "",
    singUp: "",
    noticias: "",
    proyectos: "",
    informe: "",
    ficha_tecnica: "",
    junta_directiva: "",
    junta_directiva_inactivos: "",
    administrativo: "",
    administrativo_inactivos: ""
}

export const apiRoutes = import.meta.env.DEV?localPaths:prodPaths;
