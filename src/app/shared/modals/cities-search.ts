

    export interface MatchedSubstring {
        length: number;
        offset: number;
    }

    export interface Term {
        offset: number;
        value: string;
    }

    export interface Prediction {
        description: string;
        id: string;
        matched_substrings: MatchedSubstring[];
        place_id: string;
        reference: string;
        terms: Term[];
        types: string[];
    }

    export interface PredictionsWrapper {
        status: string;
        predictions: Prediction[];
    }

