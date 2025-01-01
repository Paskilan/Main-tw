
import FormInput from "@/components/commons/FormInput";


const FeaturesPage = () => {
    return (
        <FormInput
            label="PUP Webmail"
            id="email"
            name="email"
            type="email"
            placeholder="juandc@iskolarngbayan.pup.edu.ph"
            inputClassName="grid gap-2"
            divClassName="grid gap-5"
            required
        />
    );
}
export default FeaturesPage