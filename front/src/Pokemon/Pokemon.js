export class Pokemon {
    EvolutionFrom = null;
    Id = undefined;
    Image = '';
    Name = '';
    Type1 = '';
    Type2 = '';

    constructor(initializer = {}) {
        if (initializer.EvolutionFrom) this.EvolutionFrom = initializer.EvolutionFrom;
        if (initializer.Id) this.Id = initializer.Id;
        if (initializer.Image) this.Image = initializer.Image;
        if (initializer.Name) this.Name = initializer.Name;
        if (initializer.Type1) this.Type1 = initializer.Type1;
        if (initializer.Type2) this.Type2 = initializer.Type2;
    }

    get isNew() {
        return this.Id === undefined;
    }
}
