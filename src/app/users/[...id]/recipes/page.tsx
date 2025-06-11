export default function UserRecipesPage(props: { params: { id: string } }) {
    return (
        <div>
            <h1>User Recipes for {props.params.id}</h1>
        </div>
    );
}
// This is a placeholder for the user recipes page.
