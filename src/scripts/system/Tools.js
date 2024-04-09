export class Tools {
    static importAll(r) {
        return r.keys().map(key => r(key))
    }
}