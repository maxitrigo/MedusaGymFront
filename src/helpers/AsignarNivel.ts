type Nivel = 'Principiante' | 'Intermedio Inicial' | 'Intermedio' | 'Avanzado Inicial' | 'Avanzado' | 'Experto';
type Subnivel = 1 | 2 | 3 | 4;

interface Resultado {
nivel: Nivel;
subnivel: Subnivel;
}

export const asignarNivel = (puntos: number): Resultado => {
let nivel: Nivel;
let subnivel: Subnivel;

if (puntos <= 100) {
    nivel = 'Principiante';
    subnivel = obtenerSubnivel(puntos, 0, 100);
} else if (puntos <= 200) {
    nivel = 'Intermedio Inicial';
    subnivel = obtenerSubnivel(puntos, 101, 200);
} else if (puntos <= 300) {
    nivel = 'Intermedio';
    subnivel = obtenerSubnivel(puntos, 201, 300);
} else if (puntos <= 400) {
    nivel = 'Avanzado Inicial';
    subnivel = obtenerSubnivel(puntos, 301, 400);
} else if (puntos <= 500) {
    nivel = 'Avanzado';
    subnivel = obtenerSubnivel(puntos, 401, 500);
} else {
    nivel = 'Experto';
    subnivel = obtenerSubnivel(puntos, 501, 9999); // No hay un límite superior para Experto
}

return { nivel, subnivel };
}

function obtenerSubnivel(puntos: number, minimo: number, maximo: number): Subnivel {
const rango = maximo - minimo;
const subnivel = Math.ceil((puntos - minimo + 1) / (rango / 4)) as Subnivel;
return subnivel;
}