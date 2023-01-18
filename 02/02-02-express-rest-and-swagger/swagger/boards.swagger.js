/**
 * @swagger
 * tags:
 *   name: Board
 *   description: 게시판 API
 * definitions:
 *   BoardRequestModel:
 *     type: object
 *     required:
 *       - writer
 *       - title
 *       - contents
 *     properties:
 *       writer:
 *         type: string
 *         description: 작성자
 *       title:
 *         type: string
 *         description: 제목
 *       contents:
 *         type: string
 *         description: 내용
 *   BoardResponseModel:
 *     type: object
 *     required:
 *       - id
 *       - writer
 *       - title
 *       - contents
 *     properties:
 *       id:
 *         type: int
 *         description: 인덱스
 *         example: 3
 *       writer:
 *         type: string
 *         description: 작성자
 *         example: 철수
 *       title:
 *         type: string
 *         description: 제목
 *         example: 제목입니다
 *       contents:
 *         type: string
 *         description: 내용
 *         example: 내용입니다
 *   ResponseModel:
 *     type: object
 *     required:
 *       - success
 *       - message
 *     properties:
 *       success:
 *         type: boolean
 *         description: 성공여부
 *         example: true
 *       message:
 *         type: string
 *         description: 메시지
 *         example: 성공하였습니다.
 * 
 * @swagger
 * /boards:
 *   get:
 *     summary: 게시글 전체 가져오기
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: 조회 결과
 *         content: 
 *           application/json:
 *              schema:
 *                  type: array
 *                  items: 
 *                      properties: 
 *                          number:
 *                              type: int
 *                              example: 3
 *                              description: 인덱스
 *                          writer:
 *                              type: string
 *                              example: 철수
 *                              description: 작성자
 *                          title:
 *                              type: string
 *                              example: 제목입니다
 *                              description: 제목
 *                          contents:
 *                              type: string
 *                              example: 내용입니다
 *                              description: 내용
 * 
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: 게시글 가져오기
 *     tags: [Board]
 *     parameters:
 *         - in: query
 *           name: number
 *           type: int
 *         - in: path
 *           name: id
 *           type: int
 *     responses:
 *       200:
 *         description: 조회 결과
 *         content: 
 *           application/json:
 *              schema: 
 *                  $ref: "#/definitions/BoardResponseModel"
 * 
 *
 *  @swagger
 *  paths:
 *    /boards:
 *      post:
 *        tags:
 *        - "Board"
 *        summary: "게시글 쓰기"
 * 
 *        description: ""
 *        consumes:
 *          - "application/json"
 *        requestBody:
 *          x-name: body
 *          required: true
 *          content:
 *              application/json: 
 *                  schema:
 *                      $ref: "#/definitions/BoardRequestModel"
 *        responses:
 *          200:
 *            description: "결과"
 *            content: 
 *              application/json:
 *                  schema:
 *                      $ref: "#/definitions/ResponseModel"
 */


