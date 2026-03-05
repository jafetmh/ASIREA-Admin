
const localPaths = {
    singIn: "/auth/login",
    singUp: "/user/sing-up",
    publicaciones: "/publicaciones",
    publicaciones_categorias: "/publicaciones/categorias",
    junta_directiva: "/miembroDeJunta",
    junta_directiva_inactivos: "/miembroDeJunta/inactivos",
    administrativo: "/administrativo",
    administrativo_inactivos: "/administrativo/inactivos"
}
const prodPaths = {
    singIn: "",
    singUp: "",
    publicaciones: "",
    publicaciones_categorias: "",
    junta_directiva: "",
    junta_directiva_inactivos: "",
    administrativo: "",
    administrativo_inactivos: ""
}

export const apiRoutes = import.meta.env.DEV?localPaths:prodPaths;
