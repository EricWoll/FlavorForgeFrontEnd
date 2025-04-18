interface CommentsItemProps {
    comment: Array<{ text: string; id?: number }>;
}

export default function CommentsItem(props: CommentsItemProps) {
    return (
        <div>
            <p>Comment Item</p>
        </div>
    );
}
