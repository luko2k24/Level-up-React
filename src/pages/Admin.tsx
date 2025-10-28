import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Importamos las funciones y la interfaz Producto desde la DB (ahora en TS)
import { 
    obtenerCarrito, 
    agregarAlCarrito, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    totalCarrito, 
    ItemCarrito,
    Producto, // Necesitamos la interfaz Producto para la función 'agregarAlCarrito'
    obtenerProductos,
    actualizarProducto,
    crearProducto,
    eliminarProducto
} from '../data/db'; 
import '../styles/admin.css';

// --- 1. Tipado del Formulario (Propiedades en español) ---
interface FormularioProducto {
    id: string | number;
    nombre: string; // Correcto: usando 'nombre'
    precio: number | string;
    categoria: string;
    oferta: boolean;
}

// --- 2. Constantes y Helpers ---

const CLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
});

const CATEGORIAS: string[] = ['Periféricos', 'Audio', 'Monitores', 'Muebles', 'Almacenamiento', 'Accesorios'];

// Estado inicial del formulario
const FORMULARIO_INICIAL: FormularioProducto = { 
    id: '', 
    nombre: '', 
    precio: '', 
    categoria: '', 
    oferta: false 
};

/** * Reemplazo temporal para window.confirm que usa window.prompt para evitar el bloqueo del iframe.
 * Pide al usuario que escriba 'ELIMINAR' para confirmar.
 */
const customConfirm = (message: string): boolean => {
    // Usamos prompt como una solución temporal para simular una confirmación sin usar confirm()
    const result = window.prompt(`${message}\n\nEscribe "ELIMINAR" para confirmar:`);
    return result === 'ELIMINAR';
}

// --- 3. Componente Principal ---

export default function AdminPanel() {
    const navigate = useNavigate();
    const location = useLocation();

    // Las URLs se mantienen en inglés/neutral
    const params = new URLSearchParams(location.search);
    const view = (params.get('view') || 'home').toLowerCase();
    // const mode = (params.get('mode') || 'open').toLowerCase(); // No usado

    const setView = (v: string, m: string = 'open') => {
        const next = new URLSearchParams(location.search);
        next.set('view', v);
        next.set('mode', m);
        navigate({ search: `?${next.toString()}` }, { replace: false });
    };

    // Estadísticas
    const stats = useMemo(
        () => ({ compras: 1234, productos: 400, usuarios: 892, pendientes: 17 }),
        []
    );

    // --- 4. Estados del Componente ---

    // list ahora está tipado como un arreglo de Producto (importado de db.ts)
    const [lista, setLista] = useState<Producto[]>([]); 
    // form ahora usa la interfaz FormularioProducto
    const [form, setForm] = useState<FormularioProducto>(FORMULARIO_INICIAL); 
    const [editing, setEditing] = useState<boolean>(false);
    const [err, setErr] = useState<string>('');

    // Lista ordenada (usa 'lista' y accede a 'id' de Producto)
    const listaOrdenada = useMemo(
        () => [...lista].sort((a, b) => String(a.id).localeCompare(String(b.id))),
        [lista]
    );

    /** Carga los productos desde la DB y actualiza el estado. */
    const actualizar = () => {
        try {
            // getProducts() debería devolver Producto[]
            const data = obtenerProductos() as Producto[] || [];
            setLista(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error('getProducts() falló:', e);
            setLista([]);
        }
    };

    // Efecto para cargar los productos al montar
    useEffect(() => { actualizar() }, []);

    /** Maneja los cambios en los inputs del formulario. */
    // La clave (k) debe ser una clave de FormularioProducto
    const onChange = (k: keyof FormularioProducto, v: string | number | boolean) => setForm(prev => ({ ...prev, [k]: v }));

    /** Valida los campos del formulario. */
    const validar = (): string => {
        if (!String(form.nombre).trim()) return 'El nombre es obligatorio'; 
        
        const price = Number(form.precio);
        if (!Number.isFinite(price) || price <= 0) return 'El precio debe ser un número mayor a 0';
        
        if (!String(form.categoria).trim()) return 'Selecciona una categoría';
        
        return '';
    };

    /** Maneja la creación o actualización del producto. */
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const msg = validar();
        if (msg) {
            setErr(msg);
            return;
        }
        setErr('');

        // Preparamos el payload usando propiedades en español
        const payload: Producto = {
            id: String(form.id)?.trim() || `p${Date.now()}`, // ID es String
            nombre: String(form.nombre).trim(), 
            precio: Number(form.precio),
            categoria: String(form.categoria).trim(),
            oferta: Boolean(form.oferta),
            imagen: '', // Propiedad requerida por la interfaz Producto
        };

        try {
            if (editing) {
                if (!payload.id) {
                    setErr('Falta el ID para editar');
                    return;
                }
                actualizarProducto(payload.id, payload); 
            } else {
                if (lista.some(p => String(p.id) === String(payload.id))) {
                    setErr(`Ya existe un producto con ID "${payload.id}"`);
                    return;
                }
                crearProducto(payload); 
            }

            // Limpiar formulario y estado
            setForm(FORMULARIO_INICIAL);
            setEditing(false);
            actualizar();
        } catch (e2) {
            console.error('onSubmit error:', e2);
            setErr('No se pudo guardar. Revisa la consola.');
        }
    };

    /** Carga los datos de un producto en el formulario para su edición. */
    const onEdit = (p: Producto) => {
        setForm({
            id: p.id,
            nombre: p.nombre ?? '', // Corregido: Usar p.nombre
            precio: p.precio ?? '',
            categoria: p.categoria ?? '',
            oferta: !!p.oferta
        });
        setEditing(true);
        setErr('');
    };

    /** Elimina un producto. */
    const onDelete = (id: string | number) => {
        if (!id) return;
        
        // CORRECCIÓN: Usamos customConfirm en lugar de window.confirm()
        if (customConfirm(`¿Estás seguro de eliminar el producto ${id}? Esta acción no se puede deshacer.`)) {
             try {
                eliminarProducto(String(id)); // deleteProduct espera string
                actualizar();
            } catch (e) {
                console.error('deleteProduct error:', e);
                setErr('No se pudo eliminar el producto.');
            }
        }
    };

    /** Limpia el formulario y sale del modo edición. */
    const onClear = () => {
        setForm(FORMULARIO_INICIAL);
        setEditing(false);
        setErr('');
    };

    // Componente visual para las métricas
    const kpiBox = (title: string, value: number, color: string) => (
        <div className="col-12 col-md-4 mb-3">
            <div
                className="card shadow-sm h-100"
                style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)', background: '#0f0f0f' }}
            >
                <div
                    className="p-3"
                    style={{
                        background: color,
                        color: '#000',
                        fontWeight: 700,
                        letterSpacing: .2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <span>{title}</span>
                    <span style={{ opacity: .8, fontSize: 12 }}>Dashboard</span>
                </div>
                <div className="p-4 d-flex align-items-end justify-content-between">
                    <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1, color: '#fff' }}>{value}</div>
                    <div style={{ color: 'rgba(255,255,255,.75)' }} className="small">Última act.</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container-fluid py-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0" style={{ color: '#fff' }}>Panel de administración</h2>
            </div>

            <div className="row">
                {kpiBox('Compras', stats.compras, '#30A4FF')}
                {kpiBox('Productos', stats.productos, '#47D16E')}
                {kpiBox('Usuarios', stats.usuarios, '#FFC44D')}
            </div>

            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="form-container">
                        <h2>Gestión de productos</h2>
                        {err && <div className="alert">{err}</div>}
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="producto-id">ID</label>
                                <input
                                    id="producto-id"
                                    value={form.id}
                                    onChange={e => onChange('id', e.target.value)}
                                    disabled={editing}
                                    placeholder="(auto si lo dejas vacío)"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="producto-nombre">Nombre</label>
                                <input
                                    id="producto-nombre"
                                    value={form.nombre} 
                                    onChange={e => onChange('nombre', e.target.value)} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="producto-precio">Precio</label>
                                <input
                                    id="producto-precio"
                                    type="number"
                                    value={form.precio}
                                    onChange={e => onChange('precio', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="producto-categoria">Categoría</label>
                                <select
                                    id="producto-categoria"
                                    value={form.categoria}
                                    onChange={e => onChange('categoria', e.target.value)}
                                    required
                                >
                                    <option value="">Selecciona</option>
                                    {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group checkbox-group">
                                <input
                                    id="producto-oferta"
                                    type="checkbox"
                                    checked={form.oferta}
                                    onChange={e => onChange('oferta', e.target.checked)}
                                />
                                <label htmlFor="producto-oferta">En oferta</label>
                            </div>
                            <div className="form-actions">
                                <button type="submit">{editing ? 'Guardar cambios' : 'Crear'}</button>
                                <button type="button" onClick={onClear}>Limpiar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="products-list">
                        <h2>Listado de productos</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Oferta</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaOrdenada.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.nombre}</td> 
                                        <td>{p.categoria}</td>
                                        <td>{CLP.format(p.precio)}</td>
                                        <td>{p.oferta ? 'Sí' : 'No'}</td>
                                        <td>
                                            <button onClick={() => onEdit(p)}>Editar</button>
                                            <button onClick={() => onDelete(p.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                                {listaOrdenada.length === 0 && (
                                    <tr>
                                        <td colSpan={6}>No hay productos. Crea el primero.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
