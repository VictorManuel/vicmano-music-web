export class ShareValueChildrenService {
    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

}