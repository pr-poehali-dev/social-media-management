import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для управления MediaHub платформой'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    query_params = event.get('queryStringParameters') or {}
    action = query_params.get('action', 'users')
    
    try:
        if action == 'users' and method == 'GET':
            cur.execute('SELECT * FROM users ORDER BY created_at DESC')
            users = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(u) for u in users], default=str),
                'isBase64Encoded': False
            }
        
        elif action == 'media' and method == 'GET':
            cur.execute('SELECT * FROM media_items ORDER BY created_at DESC')
            items = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(i) for i in items], default=str),
                'isBase64Encoded': False
            }
        
        elif action == 'documents' and method == 'GET':
            cur.execute('SELECT * FROM documents ORDER BY created_at DESC')
            docs = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(d) for d in docs], default=str),
                'isBase64Encoded': False
            }
        
        elif action == 'messages' and method == 'GET':
            cur.execute('SELECT * FROM support_messages ORDER BY created_at ASC')
            messages = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(m) for m in messages], default=str),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Not found'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()