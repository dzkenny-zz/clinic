export class Clinic {
    id: string = '';
    name: string = '';
    email: string = '';
    phone: string = '';
    address: string = '';

    constructor(data?: Partial<Clinic>) {
        if (data) {
            this.parse(data);
        }
    }

    parse(data: Partial<Clinic>) {
        this.id = data?.id || '';
        this.name = data?.name || '';
        this.email = data?.email || '';
        this.phone = data?.phone || '';
        this.address = data?.address || '';
    }
}