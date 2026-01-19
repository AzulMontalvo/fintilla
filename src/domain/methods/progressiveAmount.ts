/**
 * Calcula el plan de ahorro con crecimiento exponencial
 * @param total Cantidad total a ahorrar
 * @param primerDia Cantidad a ahorrar el primer día
 * @param dias Número de días del plan
 * @param precision Precisión para el cálculo de la razón (default 1e-10)
 * @param maxIterations Máximo de iteraciones para bisección (default 1000)
 * @returns Objeto con: razon, planDiario, sumaTotal
 */
function planAhorroExponencial(
    total: number,
    primerDia: number,
    dias: number,
    precision: number = 1e-10,
    maxIterations: number = 1000
): { razon: number; planDiario: number[]; sumaTotal: number } {
    
    // Caso especial: ahorro constante
    const sumaConstante = primerDia * dias;
    if (Math.abs(sumaConstante - total) < precision) {
        const plan = Array(dias).fill(primerDia);
        return {
            razon: 1,
            planDiario: plan,
            sumaTotal: sumaConstante
        };
    }
    
    // Verificar si es posible
    if (primerDia * dias > total) {
        throw new Error(
            `No es posible crecimiento exponencial con estos parámetros.\n` +
            `Con ahorro constante (razón=1) ya se ahorrarían ${sumaConstante}, que es mayor que el total ${total}.\n` +
            `Se necesitaría razón < 1 (decrecimiento).`
        );
    }
    
    // Función para calcular la suma dada una razón r
    const sumaConRazon = (r: number): number => {
        if (Math.abs(r - 1) < precision) {
            return primerDia * dias;
        }
        return primerDia * (Math.pow(r, dias) - 1) / (r - 1);
    };
    
    // Búsqueda de r por método de bisección
    let rMin = 1.0;
    let rMax = 2.0; // Valor inicial máximo
    
    // Asegurar que rMax sea suficiente para alcanzar el total
    while (sumaConRazon(rMax) < total) {
        rMax *= 1.5;
        if (rMax > 100) { // Límite para evitar overflow
            throw new Error("No se pudo encontrar una razón razonable. Verifique los parámetros.");
        }
    }
    
    let r = 1.0;
    let iteraciones = 0;
    
    while (iteraciones < maxIterations) {
        r = (rMin + rMax) / 2;
        const sumaActual = sumaConRazon(r);
        
        if (Math.abs(sumaActual - total) < precision) {
            break;
        }
        
        if (sumaActual < total) {
            rMin = r;
        } else {
            rMax = r;
        }
        
        iteraciones++;
        
        // Si los límites están muy cerca, salir
        if (rMax - rMin < precision) {
            break;
        }
    }
    
    if (iteraciones >= maxIterations) {
        console.warn("Se alcanzó el máximo de iteraciones. El resultado puede no ser preciso.");
    }
    
    // Calcular el plan diario
    const planDiario: number[] = [];
    let sumaAcumulada = 0;
    
    for (let dia = 1; dia <= dias; dia++) {
        const ahorroDia = primerDia * Math.pow(r, dia - 1);
        planDiario.push(ahorroDia);
        sumaAcumulada += ahorroDia;
    }
    
    return {
        razon: r,
        planDiario: planDiario,
        sumaTotal: sumaAcumulada
    };
}

/**
 * Función auxiliar para formatear números con 2 decimales
 */
function formatAhorroExponencial(
    total: number,
    primerDia: number,
    dias: number
): void {
    try {
        const resultado = planAhorroExponencial(total, primerDia, dias);
        
        console.log(`=== Plan de Ahorro Exponencial ===`);
        console.log(`Total objetivo: $${total.toFixed(2)}`);
        console.log(`Primer día: $${primerDia.toFixed(2)}`);
        console.log(`Días: ${dias}`);
        console.log(`Razón de crecimiento: ${resultado.razon.toFixed(6)}`);
        console.log(`Suma total del plan: $${resultado.sumaTotal.toFixed(2)}`);
        console.log(`\nDesglose diario:`);
        
        resultado.planDiario.forEach((ahorro, index) => {
            const dia = index + 1;
            console.log(`Día ${dia.toString().padStart(2)}: $${ahorro.toFixed(2)}`);
        });
        
        console.log(`\nVerificación:`);
        console.log(`- Ahorro constante sería: $${(primerDia * dias).toFixed(2)}`);
        console.log(`- Con crecimiento, último día: $${resultado.planDiario[dias-1].toFixed(2)}`);
        
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error("Error desconocido");
        }
    }
}

// Ejemplo de uso con tu caso
console.log("Ejemplo: $400 en 15 días empezando con $20");
formatAhorroExponencial(400, 20, 15);

// Ejemplo adicional
console.log("\n\nOtro ejemplo: $1000 en 30 días empezando con $10");
formatAhorroExponencial(1000, 10, 30);

// Exportar para usar en otros módulos
export { planAhorroExponencial, formatAhorroExponencial };