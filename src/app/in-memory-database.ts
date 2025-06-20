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
            { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' },
            { id: 6, name: 'Alimentação', description: 'Supermercado, restaurantes e delivery' },
            { id: 7, name: 'Transporte', description: 'Combustível, transporte público e manutenção' },
            { id: 8, name: 'Educação', description: 'Cursos, livros e material didático' },
            { id: 9, name: 'Roupas', description: 'Vestuário e calçados' },
            { id: 10, name: 'Investimentos', description: 'Aplicações e investimentos diversos' },
            { id: 11, name: 'Vendas', description: 'Vendas de produtos ou serviços' },
            { id: 12, name: 'Tecnologia', description: 'Software, hardware e gadgets' }
        ];

        const entries: Entry[] = [
            // Despesas - Novembro 2024
            { id: 1, name: 'Gás de Cozinha', categoryId: 1, category: categories[0], paid: true, date: "14/11/2024", amount: 70.80, type: "expense", description: "Gás da casa de campo" } as Entry,
            { id: 2, name: 'Aluguel apartamento', categoryId: 1, category: categories[0], paid: true, date: "11/11/2024", amount: 1700.80, type: "expense", description: "Aluguel mensal" } as Entry,
            { id: 3, name: 'Conta de Luz', categoryId: 1, category: categories[0], paid: true, date: "15/11/2024", amount: 320.50, type: "expense", description: "Energia elétrica" } as Entry,
            { id: 4, name: 'Conta de Água', categoryId: 1, category: categories[0], paid: false, date: "20/11/2024", amount: 89.30, type: "expense", description: "Água e esgoto" } as Entry,
            
            { id: 5, name: 'Plano de Saúde', categoryId: 2, category: categories[1], paid: true, date: "05/11/2024", amount: 450.00, type: "expense", description: "Mensalidade do plano" } as Entry,
            { id: 6, name: 'Remédios', categoryId: 2, category: categories[1], paid: true, date: "12/11/2024", amount: 85.40, type: "expense", description: "Medicamentos da farmácia" } as Entry,
            
            { id: 7, name: 'Cinema', categoryId: 3, category: categories[2], paid: true, date: "18/11/2024", amount: 45.00, type: "expense", description: "Ingresso e pipoca" } as Entry,
            { id: 8, name: 'Academia', categoryId: 3, category: categories[2], paid: true, date: "01/11/2024", amount: 89.90, type: "expense", description: "Mensalidade da academia" } as Entry,
            
            { id: 9, name: 'Supermercado', categoryId: 6, category: categories[5], paid: true, date: "08/11/2024", amount: 380.25, type: "expense", description: "Compras do mês" } as Entry,
            { id: 10, name: 'Delivery Pizza', categoryId: 6, category: categories[5], paid: true, date: "22/11/2024", amount: 65.90, type: "expense", description: "Jantar em família" } as Entry,
            { id: 11, name: 'Padaria', categoryId: 6, category: categories[5], paid: true, date: "25/11/2024", amount: 23.50, type: "expense", description: "Pães e café da manhã" } as Entry,
            
            { id: 12, name: 'Combustível', categoryId: 7, category: categories[6], paid: true, date: "10/11/2024", amount: 180.00, type: "expense", description: "Abastecimento do carro" } as Entry,
            { id: 13, name: 'Uber', categoryId: 7, category: categories[6], paid: true, date: "16/11/2024", amount: 25.80, type: "expense", description: "Corrida para o trabalho" } as Entry,
            
            { id: 14, name: 'Curso Online', categoryId: 8, category: categories[7], paid: true, date: "03/11/2024", amount: 150.00, type: "expense", description: "Curso de Angular" } as Entry,
            { id: 15, name: 'Livros Técnicos', categoryId: 8, category: categories[7], paid: false, date: "28/11/2024", amount: 120.90, type: "expense", description: "Livros de programação" } as Entry,
            
            { id: 16, name: 'Camisa Social', categoryId: 9, category: categories[8], paid: true, date: "19/11/2024", amount: 89.90, type: "expense", description: "Roupa para trabalho" } as Entry,
            
            { id: 17, name: 'Software Adobe', categoryId: 12, category: categories[11], paid: true, date: "01/11/2024", amount: 50.00, type: "expense", description: "Assinatura mensal" } as Entry,
            
            // Receitas - Novembro 2024
            { id: 18, name: 'Salário Empresa', categoryId: 4, category: categories[3], paid: true, date: "01/11/2024", amount: 5500.00, type: "revenue", description: "Salário mensal" } as Entry,
            { id: 19, name: 'Freelance Web', categoryId: 5, category: categories[4], paid: true, date: "15/11/2024", amount: 1200.00, type: "revenue", description: "Desenvolvimento de site" } as Entry,
            { id: 20, name: 'Consultoria', categoryId: 5, category: categories[4], paid: false, date: "25/11/2024", amount: 800.00, type: "revenue", description: "Consultoria em TI" } as Entry,
            { id: 21, name: 'Venda Notebook Antigo', categoryId: 11, category: categories[10], paid: true, date: "12/11/2024", amount: 1500.00, type: "revenue", description: "Venda de equipamento usado" } as Entry,
            { id: 22, name: 'Rendimento Poupança', categoryId: 10, category: categories[9], paid: true, date: "30/11/2024", amount: 45.80, type: "revenue", description: "Rendimento da poupança" } as Entry,
            
            // Algumas entradas para dezembro 2024
            { id: 23, name: 'Aluguel Dezembro', categoryId: 1, category: categories[0], paid: false, date: "05/12/2024", amount: 1700.80, type: "expense", description: "Aluguel mensal" } as Entry,
            { id: 24, name: 'Supermercado', categoryId: 6, category: categories[5], paid: true, date: "02/12/2024", amount: 420.15, type: "expense", description: "Compras do início do mês" } as Entry,
            { id: 25, name: 'Presente Natal', categoryId: 3, category: categories[2], paid: true, date: "15/12/2024", amount: 250.00, type: "expense", description: "Presentes de Natal" } as Entry,
            { id: 26, name: '13º Salário', categoryId: 4, category: categories[3], paid: true, date: "20/12/2024", amount: 5500.00, type: "revenue", description: "Décimo terceiro salário" } as Entry,
            
            // Algumas entradas para outubro 2024
            { id: 27, name: 'Aluguel Outubro', categoryId: 1, category: categories[0], paid: true, date: "05/10/2024", amount: 1700.80, type: "expense", description: "Aluguel mensal" } as Entry,
            { id: 28, name: 'Salário Outubro', categoryId: 4, category: categories[3], paid: true, date: "01/10/2024", amount: 5500.00, type: "revenue", description: "Salário mensal" } as Entry,
            { id: 29, name: 'Aniversário', categoryId: 3, category: categories[2], paid: true, date: "12/10/2024", amount: 180.50, type: "expense", description: "Festa de aniversário" } as Entry,
            { id: 30, name: 'Freelance Mobile', categoryId: 5, category: categories[4], paid: true, date: "28/10/2024", amount: 900.00, type: "revenue", description: "App mobile" } as Entry
        ];

        const users = [
            {
                id: 1,
                name: "Admin Finansys",
                email: "admin@finansys.com",
                password: "123456",
                avatar: null,
                isActive: true,
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-01T00:00:00Z"
            },
            {
                id: 2,
                name: "João Silva",
                email: "joao@teste.com",
                password: "123456",
                avatar: null,
                isActive: true,
                createdAt: "2024-01-15T00:00:00Z",
                updatedAt: "2024-01-15T00:00:00Z"
            },
            {
                id: 3,
                name: "Maria Santos",
                email: "maria@teste.com",
                password: "123456",
                avatar: null,
                isActive: true,
                createdAt: "2024-02-01T00:00:00Z",
                updatedAt: "2024-02-01T00:00:00Z"
            }
        ];

        return { categories, entries, users };
    }

    // Intercepta requisições de autenticação
    post(reqInfo: any) {
        const { url, body } = reqInfo;
        console.log('InMemoryDatabase POST:', { 
            url, 
            body, 
            reqInfo: reqInfo,
            hasBody: !!reqInfo.body,
            requestBody: reqInfo.req?.body,
            req: reqInfo.req
        });

        // Login
        if (url.includes('auth/login')) {
            console.log('Matching login URL');
            return this.handleLogin(reqInfo);
        }

        // Registro
        if (url.includes('auth/register')) {
            console.log('Matching register URL');
            return this.handleRegister(reqInfo);
        }

        // Esqueci senha
        if (url.includes('auth/forgot-password')) {
            console.log('Matching forgot password URL');
            return this.handleForgotPassword(reqInfo);
        }

        // Delega para o comportamento padrão da InMemoryWebApi
        return undefined;
    }

    private handleLogin(reqInfo: any) {
        console.log('handleLogin called with:', reqInfo);
        
        // Tenta acessar o body de diferentes formas
        let requestBody = reqInfo.body || reqInfo.req?.body || reqInfo.utils.getJsonBody(reqInfo.req);
        
        console.log('Request body extracted:', requestBody);
        
        if (!requestBody) {
            console.log('No body found in reqInfo');
            return reqInfo.utils.createResponse$(() => ({
                status: 400,
                body: { message: 'Dados de login não fornecidos' }
            }));
        }

        const { email, password } = requestBody;
        console.log('Login attempt:', { email, password });
        
        const users = this.createDb().users;
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            const { password: _, ...userWithoutPassword } = user;
            return reqInfo.utils.createResponse$(() => ({
                status: 200,
                body: {
                    user: userWithoutPassword,
                    token: `fake-jwt-token-${user.id}-${Date.now()}`,
                    message: 'Login realizado com sucesso!'
                }
            }));
        } else {
            return reqInfo.utils.createResponse$(() => ({
                status: 401,
                body: { message: 'Credenciais inválidas' }
            }));
        }
    }

    private handleRegister(reqInfo: any) {
        if (!reqInfo.body) {
            return reqInfo.utils.createResponse$(() => ({
                status: 400,
                body: { message: 'Dados de registro não fornecidos' }
            }));
        }

        const { name, email, password, confirmPassword } = reqInfo.body;
        const users = this.createDb().users;

        // Validações
        if (password !== confirmPassword) {
            return reqInfo.utils.createResponse$(() => ({
                status: 400,
                body: { message: 'As senhas não coincidem' }
            }));
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return reqInfo.utils.createResponse$(() => ({
                status: 409,
                body: { message: 'Este email já está em uso' }
            }));
        }

        // Criar novo usuário
        const newUser = {
            id: Math.max(...users.map(u => u.id)) + 1,
            name,
            email,
            password,
            avatar: null,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        users.push(newUser);

        const { password: _, ...userWithoutPassword } = newUser;
        return reqInfo.utils.createResponse$(() => ({
            status: 201,
            body: {
                user: userWithoutPassword,
                token: `fake-jwt-token-${newUser.id}-${Date.now()}`,
                message: 'Cadastro realizado com sucesso!'
            }
        }));
    }

    private handleForgotPassword(reqInfo: any) {
        if (!reqInfo.body) {
            return reqInfo.utils.createResponse$(() => ({
                status: 400,
                body: { message: 'Email não fornecido' }
            }));
        }

        const { email } = reqInfo.body;
        const users = this.createDb().users;
        
        const user = users.find(u => u.email === email);
        
        if (user) {
            return reqInfo.utils.createResponse$(() => ({
                status: 200,
                body: {
                    message: 'Instruções para redefinir sua senha foram enviadas para seu email!'
                }
            }));
        } else {
            return reqInfo.utils.createResponse$(() => ({
                status: 404,
                body: { message: 'Email não encontrado' }
            }));
        }
    }
}