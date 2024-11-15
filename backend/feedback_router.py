from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db_connection

# Inicializa o roteador para as rotas de feedback
router = APIRouter()

# Modelo Pydantic para validar os dados de criação de feedback
class FeedbackCreate(BaseModel):
    user_name: str
    rating: int
    comment: str
    class_predicted: str

# Rota para criar um novo feedback
@router.post("/feedbacks/")
async def create_feedback(feedback: FeedbackCreate):
    # Obtém a conexão com o banco de dados
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Executa a inserção de um novo feedback no banco de dados
        cursor.execute(
            "INSERT INTO feedbacks (user_name, rating, comment, class_predicted, created_at) VALUES (%s, %s, %s, %s, CURRENT_DATE)",
            (feedback.user_name, feedback.rating, feedback.comment, feedback.class_predicted)
        )
        # Confirma a transação para que as mudanças sejam salvas no banco
        conn.commit()
        return {"message": "Feedback enviado com sucesso!"}
    except Exception as e:
        # Em caso de erro, desfaz a transação e levanta uma exceção
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao inserir feedback: {str(e)}")
    finally:
        # Fecha o cursor e a conexão com o banco de dados
        cursor.close()
        conn.close()


# Rota para obter todos os feedbacks cadastrados
@router.get("/feedbacks/")
async def get_feedbacks():
    # Obtém a conexão com o banco de dados
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Busca todos os feedbacks do banco, ordenando por data de criação em ordem decrescente
        cursor.execute("SELECT * FROM feedbacks ORDER BY created_at DESC")
        feedbacks = cursor.fetchall()
        # Retorna os feedbacks em formato JSON
        return feedbacks
    except Exception as e:
        # Em caso de erro, levanta uma exceção com a mensagem de erro
        raise HTTPException(status_code=500, detail=f"Erro ao buscar feedbacks: {str(e)}")
    finally:
        # Fecha o cursor e a conexão com o banco de dados
        cursor.close()
        conn.close()
