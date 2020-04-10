export interface QuestionModel {
    id?: string;
    vraag?: string;
    a?: number;
    b?: number;
    c?: number;
    d?: number;
    quiz: { id: string };
}
