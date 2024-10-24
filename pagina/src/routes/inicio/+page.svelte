<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import "../../app.css";
    export let data;
    const { form, errors, message } = superForm(data.form);
</script>

<div class="campo_de_informacion">
    <div style="text-align: center;">
        <span class="texto1">
            INSTITUCIÓN EDUCATIVA
            <br />
            LOLA GONZÁLEZ
            <br />
        </span>
        <span class="titulo"> AUDM </span>
    </div>
    <table width="407" align="center">
        <tbody>
            <tr>
                <td>
                    <span
                        ><img
                            src="https://admin.lola.edu.co/utilidades/escudo.gif"
                            alt="logo-lola"
                            width="292"
                            height="294"
                        /></span
                    >
                </td>
                <td>
                    <form
                        id="formulario"
                        style="align-content: center;"
                        method="post"
                    >
                        <div class="datos_usuario">
                            <label for="codigo">
                                codigo
                                <input
                                    type="text"
                                    class="textbox"
                                    autocomplete="off"
                                    placeholder="EJ :1234"
                                    size="9"
                                    name="codigo"
                                    bind:value={$form.codigo}
                                />
                                {#if $errors.codigo}<span id="error"
                                        >{$errors.codigo}</span
                                    >{/if}
                            </label>
                            <br />
                            <label for="documento">
                                documento
                                <input
                                    type="text"
                                    class="textbox"
                                    autocomplete="off"
                                    placeholder="EJ:123456789"
                                    size="9"
                                    name="documento"
                                    bind:value={$form.documento}
                                />
                                {#if $errors.documento}<span id="error"
                                        >{$errors.documento}</span
                                    >{/if}
                            </label>
                            <br />
                            <label for="clave">
                                clave
                                <input
                                    type="password"
                                    class="textbox"
                                    autocomplete="off"
                                    placeholder="EJ:1234"
                                    size="9"
                                    name="clave"
                                    bind:value={$form.clave}
                                />
                                {#if $errors.clave}<span id="error"
                                        >{$errors.clave}</span
                                    >{/if}
                            </label>
                            <br />
                            <input id="boton" type="submit" value="ingresar" />
                        </div>
                        {#await data}
                            <p>espernado</p>
                        {/await}
                        {#if $message}
                            <span id="error">{$message}</span>
                        {/if}
                    </form>
                </td>
            </tr>
        </tbody>
    </table>
</div>
