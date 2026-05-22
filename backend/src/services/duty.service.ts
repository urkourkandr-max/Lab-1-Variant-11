type Duty = {
    id: number;
    name: string;
    comment: string;
    date: string;
    time: string;
};

const duties: Duty[] = [];

export const dutyService = {
    getAll() {
        return {
            items: duties,
            total: duties.length
        };
    },

    getById(id: number) {
        return duties.find((d) => d.id === id);
    },

    create(data: {
        name: string;
        comment: string;
        date: string;
        time: string;
    }) {
        const newDuty: Duty = {
            id: Date.now(),
            name: data.name,
            comment: data.comment,
            date: data.date,
            time: data.time
        };

        duties.push(newDuty);

        console.log("ADDED:", newDuty);
        console.log("ALL:", duties);

        return newDuty;
    },

    update(id: number, data: Partial<Duty>) {
        const index = duties.findIndex((d) => d.id === id);

        if (index === -1) return null;

        duties[index] = {
            ...duties[index],
            ...data
        };

        return duties[index];
    },

    delete(id: number) {
        const index = duties.findIndex((d) => d.id === id);

        if (index === -1) return false;

        duties.splice(index, 1);

        return true;
    }
};