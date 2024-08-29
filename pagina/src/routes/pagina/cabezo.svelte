<script>
    import { page } from "$app/stores";
</script>

<header>
    <nav>
        <ul class="menu-horizontal">
            <li
                aria-current={$page.url.pathname === "/pagina/inicio"
                    ? "page"
                    : undefined}
            >
                <a href="/pagina/inicio">inicio</a>
            </li>
            <li
                aria-current={$page.url.pathname === "/pagina/inventario"
                    ? "page"
                    : undefined}
            >
                <a href="/pagina/inventario">inventario</a>
            </li>
            <li
                aria-current={$page.url.pathname === "/pagina/acerca-de"
                    ? "page"
                    : undefined}
            >
                <a href="/pagina/acerca-de">acerca de</a>
                <ul class="menu-vertical">
                    <li
                        aria-current={$page.url.pathname ===
                        "/pagina/actualizaciones"
                            ? "page"
                            : undefined}
                    >
                        <a href="/pagina/actualizaciones">proximas updates</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="../"
                    ><img
                        src="https://media.tenor.com/zY0KJ5TLY24AAAAC/pato-bailando.gif"
                        alt="pato"
                        width="50px"
                        height="50px"
                    /></a
                >
            </li>
        </ul>
    </nav>
</header>
