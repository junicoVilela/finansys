import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.model";
import { Entry } from "./pages/entries/shared/entry.model";

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: Category[] = [
            { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
            { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
            { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
            { id: 4, name: 'Salário', description: 'Recebimento de salário' },
            { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' }
        ];

        const entries: Entry[] = [
            { id: 1, name: 'Gás de Cozinha', categoryId: categories[0].id, category: categories[0], paid: true, date: "14/11/2021", amount: "70,80", type: "expense", description: "Gás da casa de campo" } as Entry,
            { id: 2, name: 'Aluguel apartamento', categoryId: categories[0].id, category: categories[0], paid: true, date: "11/11/2021", amount: "1700,80", type: "expense", description: "Alguel apto" } as Entry,
            { id: 3, name: 'Salário', categoryId: categories[3].id, category: categories[3], paid: true, date: "01/11/2021", amount: "10000,80", type: "revenue", description: "Salário softon" } as Entry,
            { id: 4, name: 'Judô', categoryId: categories[2].id, category: categories[2], paid: true, date: "05/11/2021", amount: "220,00", type: "expense", description: "Judo" } as Entry,

        ];

        return { categories, entries }
    }
}