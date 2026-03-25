

class Vehiculo {
    tipo: 'coche' | 'moto' | 'bicicleta';
    combustible: 'gasoil' | 'gasolina' | 'electrico' | null;
    matricula: string;
    encendido: boolean = false;

    getMatricula():string {
        return this.matricula;
    }

    arrancar() {
        this.encendido = true;
    }

    apagar() {
        this.encendido = false;
    }

    estaEncencido():boolean {
        return this.encendido;
    }
}