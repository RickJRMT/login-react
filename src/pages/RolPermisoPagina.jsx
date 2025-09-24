import { useState, useEffect } from "react";
import { ModalRolPermiso } from "../components/ui/ModalRolPermiso";
import { leerRoles } from "../services/rolService";
import { leerPermisos } from "../services/permisoService";
import {
leerRolPermisos, 
crearRolPermiso, 
eliminarRolPermiso, 
leerPermisosDeRol, } from '../services/rolPermisoService'; 
import { Layout } from "../components/layout/Layout";
import './Pagina.css'; 


export const RolPermisoPagina = () => {
    const [rolPermisos, setRolPermisos] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [relacionSeleccionada, setRelacionSeleccionada] = useState(null);

    useEffect(() => {
        fetchRoles();
        fetchPermisos();
    }, []);

    const fetchRoles = async () => setRoles(await leerRoles());
    const fetchPermisos = async () => setPermisos(await leerPermisos());
    const fetchRolPermisos = async () => setPermisos(await leerRolPermisos());

    const handleSave = async ({ id_rol, permisos }) => {
        for (const permisoId of permisos) {
            await crearRolPermiso({ id_rol, permisoId });
        }
        await fetchRolPermisos();
        setOpenModal(false);
        setRelacionSeleccionada(null);
    };

    const handleEdit = async (relacion) => {
        const rolId = relacion.id_rol;
        const permisosDeRol = await leerPermisosDeRol(rolId);
        const permisos = [...new Set(permisosDeRol.map(p => Number(p.id_permiso)))];
        setRelacionSeleccionada({
            id_rol: Number(rolId),
            permisosSeleccionados: permisos,
        });
        setOpenModal(true);
    };

    return (
        <Layout>
            <div className="pagina-contenedor">
                <h2 className="pagina-titulo">Asignación Rol - Permiso</h2>
                <button
                    className="pagina-botton"
                    onClick={() => {
                        setRelacionSeleccionada(null);
                        setOpenModal(true);
                    }}
                >
                    Asignar Permiso
                </button>
                <div className="tabla-contenedor">
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th className="ocultar-columna">ID</th>
                                <th>Rol</th>
                                <th>Permiso</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rolPermisos.map(rp => (
                                <tr key={rp.id_rol_permiso}>
                                    <td className="ocultar-columna">{rp.id_rol_permiso}</td>
                                    <td>{rp.rol}</td>
                                    <td>{rp.permiso}</td>
                                    <td className="tabla-acciones">
                                        <button
                                            onClick={() => handleEdit(rp)}
                                            className="boton-accion boton-editar"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => 
                                                eliminarRolPermiso(rp.id_rol_permiso)
                                            }
                                            className="boton-accion boton-eliminar"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {openModal && (
                <ModalRolPermiso
                    openModal={openModal}
                    onClose={() => setOpenModal(false)}
                    onSave={handleSave}
                    roles={roles}
                    permisos={permisos}
                    relacionSeleccionada={relacionSeleccionada}
                    />
                )}
            </div>
        </Layout>
    );
};